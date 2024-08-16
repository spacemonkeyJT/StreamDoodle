export interface AuthInfo {
  provider_token:         string;
  provider_refresh_token: string;
  access_token:           string;
  expires_in:             number;
  expires_at:             number;
  refresh_token:          string;
  token_type:             string;
  user:                   User;
}

export interface User {
  id:                 string;
  aud:                string;
  role:               string;
  email:              string;
  email_confirmed_at: Date;
  phone:              string;
  confirmed_at:       Date;
  last_sign_in_at:    Date;
  app_metadata:       AppMetadata;
  user_metadata:      UserMetadata;
  identities:         Identity[];
  created_at:         Date;
  updated_at:         Date;
  is_anonymous:       boolean;
}

export interface AppMetadata {
  provider:  string;
  providers: string[];
}

export interface Identity {
  identity_id:     string;
  id:              string;
  user_id:         string;
  identity_data:   UserMetadata;
  provider:        string;
  last_sign_in_at: Date;
  created_at:      Date;
  updated_at:      Date;
  email:           string;
}

export interface UserMetadata {
  avatar_url:     string;
  custom_claims:  CustomClaims;
  email:          string;
  email_verified: boolean;
  full_name:      string;
  iss:            string;
  name:           string;
  nickname:       string;
  phone_verified: boolean;
  picture:        string;
  provider_id:    string;
  slug:           string;
  sub:            string;
}

export interface CustomClaims {
  broadcaster_type:  string;
  description:       string;
  offline_image_url: string;
  type:              string;
  view_count:        number;
}

export function getAuthInfo() {
  const info = localStorage.getItem(`sb-${import.meta.env.VITE_SUPABASE_ID}-auth-token`)
  if (info) {
    return JSON.parse(info) as AuthInfo
  }
  return null
}
