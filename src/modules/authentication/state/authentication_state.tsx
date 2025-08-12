import { create } from "zustand";
import { AuthenticationServices } from "../services/authentication_services";
import { ErrorModel } from "@/shared/functions/error_return";
import { LoginModel } from "../models/login_model";
import { router } from "@/shared/router";
import { ClientRoutes } from "@/shared/constants/client_routes";
import { LocalStorageProvider } from "@/shared/provider/local_storage_provider";

interface State {
  loading: 'loggingIn' | 'loggingOut' | 'none',
  loginPageError: ErrorModel | null,
  login: (modelo: LoginModel) => void,
  logout: () => void,
  resetOnDispose: () => void,
};

const AuthenticationState = create<State>()((set) => ({
  loading: 'none',
  loginPageError: null,
  login: async function (modelo: LoginModel) {
    set(() => ({ loading: 'loggingIn' }) as State);

    const res = await new AuthenticationServices().login(modelo);

    set(_ => ({ loading: 'none', loginPageError: res.error }) as State);

    if (res.user != null && res.token != null) {
      new LocalStorageProvider().setLocalStorage({ user: res.user, token: res.token, themeMode: null })
      router.navigate(ClientRoutes.dashboardHome());
      this.resetOnDispose();
    }
  },
  logout: async function () {
    set(() => ({ loading: 'loggingOut' }) as State);

    const res = await new AuthenticationServices().logout();

    set(_ => ({ loading: 'none' }) as State);

    console.log(res);

    if (res != null) {
      if (res.type == 'NotAuthenticated') {
        router.navigate(ClientRoutes.login());
      }
      if (res.type == 'NotAllowed') {
      }
      if (res.type == 'Common') {
      }
      return;
    }

    new LocalStorageProvider().clearLocalStorage({ user: true, token: true, themeMode: false })
    router.navigate(ClientRoutes.login());

    // set(_ => ({ data: res.data!, numberOfPages: res.numberOfPages!, recorsRange: res.recorsRange! }));
  },

  resetOnDispose: function () {
    set(_ => ({ loading: 'none', loginPageError: null }) as State);
  },

}));

export { AuthenticationState };
