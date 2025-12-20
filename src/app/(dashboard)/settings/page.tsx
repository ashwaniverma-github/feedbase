"use client";

import { useSession, signOut } from "next-auth/react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";

export default function SettingsPage() {
    const { data: session } = useSession();

    return (
        <>
            <Header title="Settings" description="Manage your account" />

            <div className="mx-auto max-w-2xl space-y-6 p-4 md:p-8">
                {/* Profile */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>Your account information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <Avatar
                                src={session?.user?.image}
                                name={session?.user?.name}
                                size="lg"
                            />
                            <div>
                                <p className="font-medium">{session?.user?.name}</p>
                                <p className="text-sm text-neutral-500">{session?.user?.email}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Sign Out */}
                <Card>
                    <CardHeader>
                        <CardTitle>Session</CardTitle>
                        <CardDescription>Manage your session</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            variant="secondary"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
