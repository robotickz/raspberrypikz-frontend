"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Cart, DeliveryData } from "@/src/common.types";
import CheckoutInput from "@/src/components/CheckoutInput";
import Link from "next/link";
import {
  createCarts,
  createDelivery,
  createOrder,
} from "@/src/helpers/database";
import { useRouter } from "next/navigation";
import { Collapse } from "react-collapse";

interface FormElements extends HTMLFormControlsCollection {
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  organization: HTMLInputElement;
  address: HTMLInputElement;
  locality: HTMLInputElement;
  region: HTMLInputElement;
  zipCode: HTMLInputElement;
  phone: HTMLInputElement;
  email: HTMLInputElement;
  paymentRadio: HTMLInputElement;
}
interface CheckoutFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

interface CheckoutData {
  firstName: string;
  lastName: string;
  organization: string;
  address: string;
  locality: string;
  region: string;
  zipCode: string;
  phone: string;
  email: string;
  paymentRadio: string;
}

const PaymentInfoDisplay = ({
  text,
  visible,
}: {
  text: string;
  visible: boolean;
}) => {
  return (
    <Collapse isOpened={visible}>
      <div className="relative w-0 h-0">
        <div
          className="absolute -top-[22px] left-7 w-0 h-0 border-solid border-transparent border-l-[12px] 
                     border-t-[12px] border-b-[12px] border-r-[12px] border-l-[#efefef] -rotate-90"
        ></div>
      </div>
      <div className="bg-[#efefef] text-[#515151] text-sm p-3 rounded-lg">
        {text}
      </div>
    </Collapse>
  );
};

const Checkout = () => {
  const router = useRouter();
  const initCart: Cart = { items: [] };
  const [cart, setCart] = useState(initCart);
  const [bisnesPaymentInfoActive, setBisnesPaymentInfoActive] = useState(true);
  const [visaPaymentInfoActive, setVisaPaymentInfoActive] = useState(false);
  const [selfDelivery, setSelfDelivery] = useState(true);
  const [companyDelivery, setCompanyDelivery] = useState(false);

  const checkPaymentSelection = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "payment-radio-1") {
      setBisnesPaymentInfoActive(true);
      setVisaPaymentInfoActive(false);
    } else {
      setBisnesPaymentInfoActive(false);
      setVisaPaymentInfoActive(true);
    }
  };

  const checkDeliverySelection = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "delivery-radio-1") {
      setSelfDelivery(true);
      setCompanyDelivery(false);
    } else {
      setSelfDelivery(false);
      setCompanyDelivery(true);
    }
  };

  useEffect(() => {
    const getCartFromStorage = () => {
      let value: Cart = JSON.parse(
        localStorage.getItem("cart") || '{"items":[]}',
      );
      setCart(value);
    };
    getCartFromStorage();
    window.addEventListener("storage", getCartFromStorage);
    return () => {
      window.removeEventListener("storage", getCartFromStorage);
    };
  }, []);

  const getTotalPrice = () => {
    let sum = 0;
    for (let item of cart.items) {
      sum += item.product.price * item.amount;
    }
    return sum;
  };

  const getDescriptionForPayment = () => {
    let description = "";
    for (let item of cart.items) {
      description += `${item.product.name} - ${item.amount}шт. `;
    }
    return description;
  };

  const clearCart = () => {
    const emptyCart: Cart = { items: [] };
    localStorage.setItem("cart", JSON.stringify(emptyCart));
    window.dispatchEvent(new Event("storage"));
  };

  const createNewOrder = async (data: CheckoutData) => {
    const cartsId = await createCarts(cart);
    const dData: DeliveryData = {
      firstName: data.firstName,
      lastName: data.lastName,
      organization: data.organization,
      address: data.address,
      locality: data.locality,
      region: data.region,
      zipCode: data.zipCode,
      phone: data.phone,
      email: data.email,
      isOrganization: data.paymentRadio == "bisnes",
    };
    const delivery = await createDelivery(dData);
    const newOrder = await createOrder(cartsId, delivery.id);

    if (getTotalPrice() < 1) {
      router.push("/");
    } else {
      if (data.paymentRadio == "bisnes") {
        clearCart();
        router.push(`/complete?orderNumber=${newOrder.number}&payment=b`);
      } else {
        const postData = {
          order_id: newOrder.id,
          amount: getTotalPrice().toString(),
          description: getDescriptionForPayment(),
          redirect_url: "https://raspberrypi.kz/",
          api_url: "https://pb.raspberrypi.kz/payment_status",
        };
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch("https://pay.raspberrypi.kz/create_order", {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(postData),
        })
          .then((response) => response.json())
          .then((data) => {
            clearCart();
            window.open(data.payment_url, "_blank");
            router.push("/complete");
          })
          .catch((err) => {
            if (err === "server") return;
            alert(err);
          });
      }
    }
  };

  const handleSubmit = (event: FormEvent<CheckoutFormElement>) => {
    const formData: FormElements = event.currentTarget.elements;
    const data: CheckoutData = {
      firstName: formData.firstName.value,
      lastName: formData.lastName.value,
      organization: formData.organization.value,
      address: formData.address.value,
      locality: formData.locality.value,
      region: formData.region.value,
      zipCode: formData.zipCode.value,
      phone: formData.phone.value,
      email: formData.email.value,
      paymentRadio: formData.paymentRadio.value,
    };
    createNewOrder(data).then();
    event.preventDefault();
  };

  return (
    <div className="flex flex-col items-start max-w-[1024px] w-full">
      <div className="text-3xl text-[#875C5C] font-bold mt-12 ">
        Оформление заказа
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-row flex-wrap md:flex-nowrap w-full gap-14 my-8">
          <div className="w-full md:w-[60%] py-6">
            <div className="text-[#3a3a3a] font-bold text-lg border-b pb-3 mb-6">
              Оплата и доставка
            </div>

            <div className="w-full grid grid-cols-2 gap-12">
              <CheckoutInput id="firstName" label="Имя" required />
              <CheckoutInput id="lastName" label="Фамилия" required />
            </div>
            <CheckoutInput
              id="organization"
              label="Название компании (необязательно)"
              visible={bisnesPaymentInfoActive}
            />
            <CheckoutInput
              id="address"
              label="Адрес"
              required={companyDelivery}
              placeholder="Номер дома и название улицы"
              visible={companyDelivery}
            />
            <CheckoutInput
              id="locality"
              label="Населённый пункт"
              required={companyDelivery}
              visible={companyDelivery}
            />
            <CheckoutInput
              id="region"
              label="Область / район"
              required={companyDelivery}
              visible={companyDelivery}
            />
            <CheckoutInput
              id="zipCode"
              label="Почтовый индекс"
              required={companyDelivery}
              visible={companyDelivery}
            />

            <CheckoutInput id="phone" label="Телефон" required />
            <CheckoutInput id="email" label="Email" required />
          </div>
          <div className="w-full md:w-[40%] p-6 border-2 border-gray-300 h-fit">
            <div className="text-[#3a3a3a] font-bold text-lg pb-4">
              Ваш заказ
            </div>
            <div className="w-full flex justify-between border-b py-4 text-[#7a7a7a] font-bold text-sm">
              <div>Товар</div>
              <div>Подытог</div>
            </div>
            {cart.items.map((item, index) => (
              <div
                key={index}
                className="w-full flex justify-between border-b py-4 text-[#7a7a7a] text-sm"
              >
                <div className="flex gap-2 basis-2/3">
                  <div className="font-bold">{item.product.name}</div>
                  <div>x&nbsp;{item.amount}</div>
                </div>
                <div>{item.product.price.toLocaleString("kz")} ₸</div>
              </div>
            ))}
            <div className="w-full flex justify-between border-b py-4 text-[#7a7a7a] text-sm">
              <div className="font-bold">Подытог</div>
              <div>{getTotalPrice().toLocaleString("kz")} ₸</div>
            </div>
            <div className="w-full flex justify-between border-b py-4 text-[#7a7a7a] font-bold text-sm">
              <div>Доставка</div>
              <div className="ml-4 flex flex-col items-end">
                <div className="flex items-center mb-4">
                  <input
                    defaultChecked={selfDelivery}
                    id="delivery-radio-1"
                    type="radio"
                    value="self"
                    name="deliveryRadio"
                    onChange={checkDeliverySelection}
                  />
                  <label
                    htmlFor="delivery-radio-1"
                    className="ms-2 text-sm text-[#7a7a7a]"
                  >
                    Самовывоз
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    defaultChecked={companyDelivery}
                    id="delivery-radio-2"
                    type="radio"
                    value="company"
                    name="deliveryRadio"
                    onChange={checkDeliverySelection}
                  />
                  <label
                    htmlFor="delivery-radio-2"
                    className="ms-2 text-sm text-[#7a7a7a]"
                  >
                    Единая ставка: 3,000 ₸
                  </label>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between border-b py-4 text-[#7a7a7a] text-sm">
              <div className="font-bold">Итого</div>
              <div>
                {companyDelivery
                  ? (getTotalPrice() + 3000).toLocaleString("kz")
                  : getTotalPrice().toLocaleString("kz")}{" "}
                ₸
              </div>
            </div>
            <div className="mt-8">
              <div className="flex items-center mb-4">
                <input
                  defaultChecked
                  id="payment-radio-1"
                  type="radio"
                  value="bisnes"
                  name="paymentRadio"
                  onChange={checkPaymentSelection}
                />
                <label
                  htmlFor="payment-radio-1"
                  className="ms-5 text-sm text-[#7a7a7a]"
                >
                  Для юридических лиц
                </label>
              </div>
              <PaymentInfoDisplay
                text="Оплату нужно направлять напрямую на наш банковский счет.
                      Используйте номер заказа в качестве кода платежа. Заказ будет
                      отправлен после поступления средств на наш счет."
                visible={bisnesPaymentInfoActive}
              />

              <div className="flex items-center my-4">
                <input
                  id="payment-radio-2"
                  type="radio"
                  value="visa"
                  name="paymentRadio"
                  onChange={checkPaymentSelection}
                  disabled
                />
                <label
                  htmlFor="payment-radio-2"
                  className="ms-5 text-sm text-[#7a7a7a]"
                >
                  ForteEcom
                </label>
              </div>
              <PaymentInfoDisplay
                text="Оплатить с Visa/Mastercard"
                visible={visaPaymentInfoActive}
              />
            </div>
            <div className="text-sm text-[#7a7a7a] py-8">
              Ваши личные данные будут использоваться для обработки ваших
              заказов, упрощения вашей работы с сайтом и для других целей,
              описанных в нашей{" "}
              <Link
                target="_blank"
                className="text-blue-500"
                href="/privacy_policy"
              >
                политике конфиденциальности
              </Link>
              .
            </div>
            <div>
              <input type="checkbox" name="agree" id="agree" required />
              <label
                htmlFor="agree"
                className="font-bold text-[11px] ms-2 required text-[#7a7a7a]"
              >
                Я прочитал(а) и принимаю{" "}
                <Link
                  target="_blank"
                  className="text-blue-500"
                  href="/contract_offer"
                >
                  правила и условия
                </Link>{" "}
                сайта
              </label>
            </div>
            <input
              type="submit"
              value="Подтвердить заказ"
              className="bg-[#e74c3c] rounded-sm text-center text-sm font-bold text-white py-2 px-2 mt-3 w-full cursor-pointer"
              onClick={() => {}}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
