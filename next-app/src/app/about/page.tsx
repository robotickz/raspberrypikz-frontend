import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Контакты - Raspberry Pi - одноплатные компьютеры",
  description: "Контакты",
};

const AboutPage = () => {
  return (
    <div className="grid md:grid-flow-col auto-cols-fr gap-8 max-w-[1024px] my-20">
      <div>
        <div className="text-3xl mb-6">Контакты</div>
        <div>
          <p className="text-sm">
            Адрес: <span>г. Алматы, Улица </span>
            <br />
            Телефоны: +7 778 
            <br />
            <br />
            Электронная почта: 
          </p>
        </div>
        <div className="text-2xl mb-6 mt-10">Юридическое лицо</div>
        <div className="text-sm">
          Товарищество с ограниченной ответственностью 
          <br />
          БИН: 
          <br />
          Номер счета:  KZT
          <br />
          КБе: 17
          <br />
          БИК Банка: 
          <br />
          Наименование Банка: 
        </div>
        <div className="text-2xl mb-6 mt-10">О нас</div>
        <div className="text-sm">
          Товарищество с ограниченной ответственностью "Рога и копыта" занимается
          разработкой программного обеспечения широкого спектра, включая
          программы для одноплатных компьютеров.
        </div>
      </div>
      <div className="relative overflow-hidden">
        <a
          href=""
          className="text-[#eee] text-sm absolute top-0"
        >
          Алматы
        </a>
        <a
          href=""
          className="text-[#eee] text-sm absolute top-[14px]"
        >
          Улица Ташена Утепова, 19А — Яндекс Карты
        </a>
        <iframe
          src="тут вджет какой-нибудь карты"
          width="560"
          height="400"
          frameBorder="1"
          allowFullScreen
          className="relative"
        ></iframe>
      </div>
    </div>
  );
};

export default AboutPage;
