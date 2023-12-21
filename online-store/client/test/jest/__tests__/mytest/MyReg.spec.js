import { describe, expect, it } from "@jest/globals";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-jest";
import { mount, shallowMount } from "@vue/test-utils";
import { QInput } from "quasar";
import RegPage from "../../../../src/pages/RegPage";

installQuasarPlugin();

describe("RegPage", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(RegPage);
  });

  it("Проверка поля email", async () => {
    const emailInput = wrapper.find('input[type="email"]');

    // Тест 1: Ввод только цифр
    await emailInput.setValue("12345678");
    expect(wrapper.vm.validateEmail1()).toBe("Email address is not valid");

    // Тест 2: Ввод только русских букв
    await emailInput.setValue("абвгдежя");
    expect(wrapper.vm.validateEmail1()).toBe("Email address is not valid");

    // Тест 3: Ввод только английских букв
    await emailInput.setValue("abcdefz");
    expect(wrapper.vm.validateEmail1()).toBe("Email address is not valid");

    // Тест 4: Ввод правильного email
    await emailInput.setValue("12345@mail.ru");
    expect(wrapper.vm.validateEmail1()).toBe("Email address is valid");

    // Тест 5: Ввод email без домена
    await emailInput.setValue("12345@mail");
    expect(wrapper.vm.validateEmail1()).toBe("Email address is not valid");

    // Тест 6: Ввод правильного email
    await emailInput.setValue("abcedfz@mail.com");
    expect(wrapper.vm.validateEmail1()).toBe("Email address is valid");
  });

  it("Проверка поля пароль", async () => {
    const passwordInput = wrapper.find('input[type="password"]');

    // Тест 1: Пароль менее 8 символов
    await passwordInput.setValue("123456");
    expect(wrapper.vm.validatePassword1()).toBe(
      "String should have at least 8 characters"
    );

    // Тест 2: Пароль менее 8 символов
    await passwordInput.setValue("abcdef");
    expect(wrapper.vm.validatePassword1()).toBe(
      "String should have at least 8 characters"
    );

    // Тест 3: Пароль из русских букв более 8 символов
    await passwordInput.setValue("фываяатт");
    expect(wrapper.vm.validatePassword1()).toBe("String is valid");

    // Тест 4: Пароль из английских букв более 8 символов
    await passwordInput.setValue("qwertyasdf");
    expect(wrapper.vm.validatePassword1()).toBe("String is valid");
  });
});
