import { useRouteLoaderData } from "react-router-dom"
import { Tables } from "../database.types"
import { AuthInfo, getAuthInfo } from "../utils/auth"
import { supabase } from "../utils/supabase"

export interface RootData {
  auth: AuthInfo | null,
  channels: Tables<"channels">[]
}

export async function loadRootData(): Promise<RootData> {
  return {
    auth: getAuthInfo(),
    channels: (await supabase.from('channels').select()).data ?? [],
  }
}

export function useRootData() {
  return useRouteLoaderData('root') as RootData
}
