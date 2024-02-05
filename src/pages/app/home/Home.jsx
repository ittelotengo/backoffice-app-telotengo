import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CalculatorDialog from "../../../components/molecules/dialog/CalculatorDialog";
import {
  createAmount,
  getPriceDollar,
} from "../../../repositories/price.repository";
import dayjs from "dayjs";

import { isEmpty } from 'lodash'

const Home = () => {
  const [open, setOpen] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const [change, setChange] = useState(false);

  const [priceDollar, setPriceDollar] = useState(0.00);

  const compararFechas = (a, b) => {
    const fechaA = dayjs(a.date);
    const fechaB = dayjs(b.date);
  
    // Compara las fechas en orden descendente
    return fechaB.diff(fechaA);
  };
  

  const handleChangeAmount = async (value) => {
    createAmount({
      price_dollar: value,
      date: dayjs().toISOString(),
    })
      .then((resId) => {
        setLoading(false);
        setChange(!change);
      })
      .finally((elem) => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    getPriceDolla
      .then((res) => {
        if (isEmpty(res)) return
      
        const newList = res.sort(compararFechas);
        setPriceDollar(res[0]?.price_dollar)
      })
      .finally((elem) => {setLoading(false); setOpen(false)});
  }, [change]);

  console.log(priceDollar)
  return (
    <div className="w-full h-full mb-6">
      <h1 className="font-bold text-3xl">Inicio</h1>

      <Grid container marginTop={8}>
        <Grid item xs={6}>
          <div
            className="p-6 w-full mt-6 rounded-md border-black-400"
            style={{
              boxShadow: "0px 0px 4px 0px #00000040",
            }}
          >
            <Grid container>
              <Grid item xs={8}>
                <h2 className="font-semibold text-gra_text text-xl mb-6 text-gray_text">
                  Tasa de cambio
                </h2>
              </Grid>

              <Grid item xs={4}>
                <button
                  className="bg-primary px-2 py-2 rounded-md h-full w-full"
                  onClick={() => setOpen(true)}
                  style={{
                    color: "#FFFFFF",
                  }}
                >
                  Editar
                </button>
              </Grid>
            </Grid>
            <p className="text-primary font-bold text-3xl">
              {/* {`${total_payments?.total ? Number(total_payments?.total).toFixed(2)  : 0.0} Bs`} */}
              {`${priceDollar} Bs`}
            </p>
          </div>
        </Grid>
      </Grid>
      <CalculatorDialog
        open={open}
        onSubmit={(value) => handleChangeAmount(value)}
        onClose={() => setOpen(false)}
        price={priceDollar}
      />
    </div>
  );
};

export default Home;
