// import { LocalStorageProvider } from "@/shared/provider/local_storage_provider";
import { HomeState } from "../state/home_state";
import { useEffect } from "react";

export function HomePage() {
  // const localStorageProvider = new LocalStorageProvider();
  const state = HomeState();

  useEffect(() => {
    state.read();
  }, []);

  return (<>
    <h1>HOME</h1>
    {/* <h1>{count}</h1>
    <button onClick={() => inc()}>ADD</button> */}
  </>);
}