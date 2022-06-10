import { useEffect, useState } from "react";
import Balance from "./Balance";
import Cards from "./Cards";
import Panel from "./Panel";
import Plans from "./Plans";
import Waitlist from "./Waitlist";
import { path } from "../../config/path";

export default function Container() {
  const [datacards, setDataCards] = useState([]);

  useEffect(() => {
    fetch(`${path}/wallet/list/user/`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        token: "",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data.payload);
        setDataCards(data.payload);
      })
      .catch((err) => console.error(`Error at loading api -> ${err}`));
  }, []);

  const [balance, setBalance] = useState([]);

  const changeData = (content) => {
    setBalance(content);
  };

  return (
    <div className="container">
      <Cards data={datacards} action={changeData} />
      <Panel data={balance} />
      <Waitlist />
      <Plans />
      <Balance data={balance} />
    </div>
  );
}
