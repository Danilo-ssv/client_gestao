import { SessionUserModel } from "@/modules/authentication/models/session_user_model";

interface SetProps {
  token: string | null,
  user: SessionUserModel | null,
  themeMode: 'light' | 'dark' | null,
}

interface ClearProps {
  token: boolean,
  user: boolean,
  themeMode: boolean,
}

export class LocalStorageProvider {
  setLocalStorage = function (props: SetProps) {
    if (props.token != null) {
      localStorage.setItem('token', props.token);
    }
    if (props.user != null) {
      localStorage.setItem('user', JSON.stringify(props.user));
    }
    if (props.themeMode != null) {
      localStorage.setItem('themeMode', props.themeMode);
    }
  }

  clearLocalStorage = function (props: ClearProps) {
    if (props.token) {
      localStorage.removeItem('token');
    }
    if (props.user) {
      localStorage.removeItem('user');
    }
    if (props.themeMode) {
      localStorage.removeItem('themeMode');
    }
  }

  getToken: () => string = function () {
    return localStorage.getItem('token') ?? '';
  }

  getUser: () => SessionUserModel | null = function () {
    const key = localStorage.getItem('user');
    if (key == null) return null;
    return JSON.parse(key);
  }

  getThemeMode: () => 'light' | 'dark' = function () {
    const key = localStorage.getItem('themeMode');
    if (key == 'dark') return 'dark';
    return "light";
  }
}
