import { mount } from "@vue/test-utils";
import MainPage from "../../../../src/pages/MainPage";

describe("MainPage", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(MainPage);
  });

  it('проверяет ввод значения в поле "Название книги" и обновление переменной bookData.name', async () => {
    const inputBookName = wrapper.find(
      'q-input[placeholder="Название книги"] input'
    );
    await inputBookName.setValue("Lord of the Rings");
    expect(wrapper.vm.bookData.name).toBe("Lord of the Rings");
  });

  it('проверяет ввод значения в поле "Описание книги" и обновление переменной bookData.description', async () => {
    const inputBookDescription = wrapper.find(
      'q-input[placeholder="Описание книги"] input'
    );
    await inputBookDescription.setValue("An epic fantasy novel");
    expect(wrapper.vm.bookData.description).toBe("An epic fantasy novel");
  });

  it('проверяет ввод значения в поле "Цена" и обновление переменной bookData.price', async () => {
    const inputBookPrice = wrapper.find('q-input[placeholder="Цена"] input');
    await inputBookPrice.setValue("99");
    expect(wrapper.vm.bookData.price).toBe(99);
  });
});
