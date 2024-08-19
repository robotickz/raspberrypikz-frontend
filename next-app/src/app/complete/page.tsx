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
            Товарищество с ограниченной ответственностью «NTSM» <br /> БИН:
            220240015604
            <br />
            Номер счета: KZ8596502F0015584568 KZT <br />
            КБе: 17 <br />
            БИК Банка: IRTYKZKA
            <br />
            Наименование Банка: Филиал АО «ForteBank» в г. Алматы <br />
            Адрес: г. Алматы, пр. Назарбаева 103, 5 этаж, 503/2 кабинет
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
