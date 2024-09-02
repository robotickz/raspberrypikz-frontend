import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer
      className="bg-[#ecf0f1] flex justify-center
        min-h-20 pr-6 pl-6 pt-20 pb-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-start items-stretch max-w-[1024px] w-full">
        <div className="">
          <h1 className="text-black text-3xl pb-3">Способы оплаты</h1>
          <Image
            src="/visa_master_card.png"
            width="250"
            height="65"
            alt="Payment types"
          />
        </div>
        <div className="mt-12 md:mt-0">
          <h1 className="text-3xl pb-3">Контакты</h1>
          <p>
            <b>Адрес:</b> г. Алматы, Улица Утепова, 19а
          </p>
          <p>
            <b>Телефоны:</b>&nbsp;
            <a className="text-blue-600" href="http://tel:+77785722596">
              +7 778 572 25 96
            </a>
            ,&nbsp;
            <a className="text-blue-600" href="http://tel:+77777718929">
              +7 777 771 89 29
            </a>
          </p>
          <p>
            <b>Электронная почта:</b>&nbsp;
            <a className="text-blue-600" href="mailto: admin@raspberrypi.kz">
              admin@raspberrypi.kz
            </a>
          </p>
          <p>
            <b>Доставка:</b> по г. Алматы самовывоз
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
