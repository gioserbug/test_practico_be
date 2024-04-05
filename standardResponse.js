const author = {
  name: "Sergio",
  lastName: "Cano",
};

const standardResponseAllItems = (data) => {
  const categories = data?.filters?.[0]?.values;

  const items = data.results?.map((el) => ({
    id: el.id,
    title: el.title,
    price: {
      currency: el.currency_id,
      amount: el.price,
      decimals: el.price?.toLocaleString(),
    },
    picture: el.thumbnail,
    condition: el.condition,
    free_shipping: el.shipping?.free_shipping,
  }));

  const dataStandard = {
    ...author,
    categories,
    items,
  };

  return dataStandard;
};

const standardResponseByItem = (item, description) => {
  const dataStandard = {
    ...author,
    item: {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: item.price?.toLocaleString(),
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping?.free_shipping,
      sold_quantity: item.initial_quantity, //la propiedad sold_quantity no la devuelve la api de mercado libre, se escoge otra propiedad para realizar el ejercicio
      description: description.plain_text,
    },
  };

  return dataStandard;
};

module.exports = {
  standardResponseAllItems,
  standardResponseByItem,
};
