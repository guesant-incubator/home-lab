import { GetServerSideProps } from "next";
import Head from "next/head";
import { useCallback } from "react";
import { getMachines } from "../server/database/db";
import { IMachine } from "../server/schemas/IMachine";
import styles from "../styles/Home.module.css";

type IHomeProps = {
  machines: IMachine[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const machines = await getMachines();

  return {
    props: {
      machines,
    },
  };
};

const Home = (props: IHomeProps) => {
  const { machines } = props;

  const handleSuspend = useCallback(async (machineId: string) => {
    await fetch(`/api/machines/${machineId}/suspend`);
  }, []);

  const handleActivate = useCallback(async (machineId: string) => {
    await fetch(`/api/machines/${machineId}/wakeup`);
  }, []);

  return (
    <>
      <Head>
        <title>Início | Painel | home-lab</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        <section className={styles.machines}>
          <h1>Máquinas</h1>

          <ul>
            {machines.map((machine) => (
              <li key={machine.id}>
                <fieldset>
                  <legend>{machine.id}</legend>

                  <div className={styles.actions}>
                    <button onClick={() => handleActivate(machine.id)}>
                      Ativar
                    </button>
                    <button onClick={() => handleSuspend(machine.id)}>
                      Suspender
                    </button>
                  </div>
                </fieldset>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Home;
