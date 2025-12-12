import { NextResponse } from 'next/server';
import DodoPayments from 'dodopayments';
import { auth } from '@/lib/auth';

type CreateCheckoutBody = {
    product_id: string;
    metadata?: Record<string, any>;
    return_url?: string;
};

export async function POST(req: Request) {
    try {
        const apiKey = process.env.DODO_PAYMENTS_API_KEY;
        const env = process.env.DODO_ENVIRONMENT === 'live_mode' ? 'live_mode' : 'test_mode';

        if (!apiKey) {
            return NextResponse.json(
                { error: 'Server misconfigured: missing DODO_PAYMENTS_API_KEY' },
                { status: 500 }
            );
        }

        // Require authenticated user before creating a checkout session
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }


        const client = new DodoPayments({
            bearerToken: apiKey,
            environment: env,
        });

        const body = (await req.json()) as CreateCheckoutBody;
        const productId = body.product_id;

        if (!productId) {
            return NextResponse.json({ error: 'product_id is required' }, { status: 400 });
        }

        const baseReturn =
            body.return_url ||
            process.env.DODO_RETURN_URL_BASE ||
            `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard`;

        const params: any = {
            product_cart: [{ product_id: productId, quantity: 1 }],
            return_url: baseReturn,
            allowed_payment_method_types: ['credit', 'debit'],
            show_saved_payment_methods: true,
            // Attach customer by email to help unify sessions
            ...(session.user?.email
                ? {
                    customer: {
                        email: session.user.email as string,
                        name: (session.user as any).name || undefined,
                    },
                }
                : {}),
            // Enrich metadata with user context
            metadata: {
                ...(body.metadata ?? {}),
                user_id: session.user.id,
                email: session.user?.email ?? null,
            },
        };

        const checkoutSession = await client.checkoutSessions.create(params);

        return NextResponse.json({
            checkout_url:
                (checkoutSession as any).checkout_url ??
                (checkoutSession as any).url ??
                (checkoutSession as any).link ??
                (checkoutSession as any).checkout?.url ??
                (checkoutSession as any).checkout_url,
            session_id: (checkoutSession as any).session_id ?? (checkoutSession as any).id ?? (checkoutSession as any).session_id,
        });
    } catch (err: any) {
        console.error('Dodo create-checkout-session error', err);
        return NextResponse.json(
            { error: 'Failed to create checkout session', details: err?.message ?? 'unknown' },
            { status: 500 }
        );
    }
}