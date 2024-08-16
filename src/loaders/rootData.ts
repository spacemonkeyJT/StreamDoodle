import { redirect, useRouteLoaderData } from "react-router-dom"
import { Tables } from "../database.types"
import { AuthInfo, getAuthInfo } from "../utils/auth"
import { supabase } from "../utils/supabase"

export interface RootData {
  auth: AuthInfo,
  channels: Tables<"channels">[]
}

export async function loadRootData() {
  const auth = getAuthInfo()
  if (auth) {
    return {
      auth,
      channels: (await supabase.from('channels').select()).data,
    }
  }
  return redirect('/login')
}

export function useRootData() {
  return useRouteLoaderData('root') as RootData
}
