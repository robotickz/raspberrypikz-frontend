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
            Адрес: <span>г. Алматы, Улица Утепова, 19а</span>
            <br />
            Телефоны: +7 778 572 25 96, +7 777 771 89 29
            <br />
            <br />
            Электронная почта: admin@raspberrypi.kz
          </p>
        </div>
        <div className="text-2xl mb-6 mt-10">Юридическое лицо</div>
        <div className="text-sm">
          Товарищество с ограниченной ответственностью «NTSM»
          <br />
          БИН: 220240015604
          <br />
          Номер счета: KZ8596502F0015584568 KZT
          <br />
          КБе: 17
          <br />
          БИК Банка: IRTYKZKA
          <br />
          Наименование Банка: Филиал АО «ForteBank» в г. Алматы
        </div>
        <div className="text-2xl mb-6 mt-10">О нас</div>
        <div className="text-sm">
          Товарищество с ограниченной ответственностью «NTSM» занимается
          разработкой программного обеспечения широкого спектра, включая
          программы для одноплатных компьютеров.
        </div>
      </div>
      <div className="relative overflow-hidden">
        <a
          href="https://yandex.kz/maps/162/almaty/?utm_medium=mapframe&utm_source=maps"
          className="text-[#eee] text-sm absolute top-0"
        >
          Алматы
        </a>
        <a
          href="https://yandex.kz/maps/162/almaty/house/tashen_otepov_koshesi_19a/Y08Yfg5lTEYAQFppfX5weHthZw==/?ll=76.896500%2C43.219509&utm_medium=mapframe&utm_source=maps&z=17.57"
          className="text-[#eee] text-sm absolute top-[14px]"
        >
          Улица Ташена Утепова, 19А — Яндекс Карты
        </a>
        <iframe
          src="https://yandex.kz/map-widget/v1/?ll=76.896500%2C43.219509&mode=whatshere&whatshere%5Bpoint%5D=76.894838%2C43.219703&whatshere%5Bzoom%5D=17&z=17.57"
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
