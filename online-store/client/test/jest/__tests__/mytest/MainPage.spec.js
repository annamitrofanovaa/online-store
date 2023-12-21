import { shallowMount } from "@vue/test-utils";
import MainPage from "../../../../src/pages/MainPage";

describe("MainPage", () => {
  it("проверяет ввод данных о книге", async () => {
    const wrapper = shallowMount(MainPage);

    // Проверка ввода названия книги
    await wrapper
      .find('input[placeholder="Название книги"]')
      .setValue("Lord of the Rings");
    expect(wrapper.vm.bookData.name).toBe("Lord of the Rings");

    // Проверка выбора автора
    const authorSelect = wrapper.findComponent({ ref: "authorSelect" });
    await authorSelect.vm.$emit("change", { id: 1, name: "Tolkien" });
    expect(wrapper.vm.authors).toBe(1);

    // Проверка выбора жанра
    const genreSelect = wrapper.findComponent({ ref: "genreSelect" });
    await genreSelect.vm.$emit("change", { id: 1, name: "Fantasy" });
    expect(wrapper.vm.genres).toBe(1);

    // Проверка ввода описания книги
    await wrapper
      .find('input[placeholder="Описание книги"]')
      .setValue("A fantasy novel");
    expect(wrapper.vm.bookData.description).toBe("A fantasy novel");

    // Проверка ввода цены
    await wrapper.find('input[placeholder="Цена"]').setValue("19.99");
    expect(wrapper.vm.bookData.price).toBe("19.99");

    // Проверка добавления изображения
    const fileInput = wrapper.findComponent({ ref: "fileInput" });
    await fileInput.vm.$emit("change", [{ name: "book_cover.jpg" }]);
    expect(wrapper.vm.file.name).toBe("book_cover.jpg");

    // Проверка добавления книги
    await wrapper.find('q-btn[text-color="white"]').trigger("click");
    // Ожидаемый результат после добавления книги в вашей логике

    // Проверка открытия диалогового окна
    expect(wrapper.vm.dialogOpen).toBe(true);

    // Проверка отмены добавления книги
    await wrapper.find("q-btn[flat]").trigger("click");
    expect(wrapper.vm.dialogOpen).toBe(false);
  });
});
