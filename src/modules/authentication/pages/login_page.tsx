import { useState } from "react";
import { AuthenticationState } from "../state/authentication_state";
import { LoginModel } from "../models/login_model";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@mui/material";
import { CustomInput } from "@/shared/components/custom_input";

export function LoginPage() {

  const state = AuthenticationState();

  const [controller, setController] = useState<LoginModel>({
    email: '',
    senha: '',
  });

  function onChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setController({
      ...controller,
      [event.target.id]: event.target.value,
    });
  }

  function insert(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    if (state.loading == 'loggingIn') return;

    if (controller.email == '') {
      console.log('Nome Completo é Obrigatório!');
      return;
    }

    if (controller.senha == '') {
      console.log('Nome Completo é Obrigatório!');
      return;
    }

    state.login({
      email: controller.email,
      senha: controller.senha,
    });
  }

  // useEffect(() => {
  //   if (queryProps.id != '') {
  //     state.readById(queryProps.id).then((value) => {
  //       if (value != null) {
  //         setController(value);
  //       }
  //     });
  //   }
  // }, []);

  return (
    <div className="px-1 pt-1">
      <h1>Login</h1>
      <form onSubmit={insert} action="">
        <label htmlFor="email">E-mail:</label>
        <CustomInput
          id='email'
          placeholder="Digite o E-mail"
          value={controller.email}
          onChange={onChange}
          type="email"
          required
        />
        <label htmlFor="senha">Senha:</label>
        <CustomInput
          id='senha'
          placeholder="Digite a Senha"
          value={controller.senha}
          onChange={onChange}
          type="password"
          required
        />
        {
          state.loginPageError == null
            ? null
            : <div>{state.loginPageError.message}</div>
        }
        <div className="relative inline-block">
          <Button className={state.loading == 'loggingIn' ? 'text-transparent' : '' + 'hover:cursor-pointer'} type="submit" >
            Enviar
          </Button>
          {
            state.loading == 'loggingIn' ?
              <CircularProgress size={30} color="inherit" className="absolute right-1/2 bottom-1/2 translate-1/2 text-white" />
              : null
          }
        </div>
        {/* {state.loading == 'loggingIn' ? <CircularProgress className="absolute bottom-1/2 right-1/2 translate-1/2" /> : null} */}
      </form>
    </div>
  );
}