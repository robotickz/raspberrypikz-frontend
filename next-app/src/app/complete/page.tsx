"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const IconWithHeading = () => {
  return (
    <>
      {/* <DotLottieReact
        src="/lotties/complete-animation.lottie"
        autoplay
        className="w-[200px] h-[200px]"
      /> */}
      <h1 className="text-3xl text-green-500">Ваш заказ оформлен</h1>
    </>
  );
};

const CompleteBody = () => {
  const queryParams = useSearchParams();
  if (queryParams.get("payment") === "b") {
    return (
      <div className="border-2 p-8 rounded-3xl shadow-md flex flex-col gap-8 items-center">
        <IconWithHeading />
        <p className="text-xl">
          Номер заказа: {queryParams.get("orderNumber")}
        </p>
        <div>
          <h2 className="font-bold">Реквизиты для оплаты:</h2>
          <p className="pt-3">
            Товарищество с ограниченной ответственностью «RBA Group» <br /> БИН:
            170640007567
            <br />
            Номер счета: KZ40722S000001416971 KZT <br />
            КБе: 17 <br />
            БИК Банка: CASPKZKA
            <br />
            Наименование Банка: АО "Kaspi Bank" <br />
            Адрес: Казахстан, Алматы, 9 МКР, дом 49, кв/офис 40
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="border-2 p-8 rounded-3xl shadow-md flex flex-col gap-12 items-center">
      <IconWithHeading />
    </div>
  );
};

const Complete = () => {
  return (
    <Suspense>
      <CompleteBody />
    </Suspense>
  );
};

export default Complete;
