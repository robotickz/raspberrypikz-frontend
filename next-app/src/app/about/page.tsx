import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'Контакты - Raspberry Pi - одноплатные компьютеры',
  description: 'Контакты',
}

const AboutPage = () => {
  return (
    <div className="grid md:grid-flow-col auto-cols-fr gap-8 max-w-[1024px] my-20">
      <div>
        <div className="text-3xl mb-6">Контакты</div>
        <div>
          <p className="text-sm">
            Адрес:{" "}
            <span>
              г. Алматы, пр. Назарбаева 103,&nbsp; этаж 5, кабинет 503/2
            </span>
            <br />
            Телефоны: +7 777 931 95 33, +7 778 572 25 96, +7 777 771 89 29
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
      <div>
        <iframe
          className="md:h-full w-full"
          src="https://yandex.kz/map-widget/v1/?ll=76.945762%2C43.257619&amp;mode=search&amp;ol=geo&amp;ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg2NzI5Nzc0MxJI0prQsNC30LDSm9GB0YLQsNC9LCDQkNC70LzQsNGC0YssINCd0LDQt9Cw0YDQsdCw0LXQsiDQtNCw0qPSk9GL0LvRiywgMTAzIgoNO-SZQhXNBy1C&amp;z=17.05"
          width="560"
          height="400"
          frameBorder="1"
        ></iframe>
      </div>
    </div>
  );
};

export default AboutPage;
