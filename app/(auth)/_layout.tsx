import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/libs/supabase";
import * as Linking from "expo-linking";
import * as QueryParams from "expo-auth-session/build/QueryParams";

export default function AuthLayout() {
  const { session } = useAuth();

  const url = Linking.useURL();

  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);

    if (errorCode) throw new Error(errorCode);
    const { access_token, refresh_token } = params;

    if (!access_token) return;

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) throw error;
    return data.session;
  };

  if (url) {
    createSessionFromUrl(url);
  }

  if (session) {
    return <Redirect href={"/"} />;
  }
  return <Stack />;
}
