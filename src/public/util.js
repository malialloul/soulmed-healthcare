import { welcomeConroller } from "../controllers/welcome-page";

const isValidEmail = (email) =>
  // eslint-disable-next-line no-useless-escape
  /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email);

const isValidPassword = (password) => {
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
};

const isValidPhoneNumber = (phone_number) => {
  /^[0-9]*$/.test(phone_number);
};

const isValidName = (firstName) => {
  /^[A-Za-z]+$/i.test(firstName);
};

const showItem = (item, searchText) => {
  let show = false;
  if (searchText === "") {
    return true;
  }
  Object.keys(item).map((innerAttr, index) => {
    if ((item[innerAttr] + "").indexOf(searchText) >= 0) {
      show = true;
    }
  });

  return show;
};

const getProfessionAndCategoriesNames = (profession_id) => {
  return welcomeConroller.getInfoByQuery().then((response) => {
    let res = response.data;
    let list = [];
    for (let i = 0; i < res.length; i++) {
      let json = {};
      welcomeConroller.getProfession(res[i].profession_fk).then((pr) => {
        const cfk = pr.data[0].category_fk;

        welcomeConroller.getCategory(cfk).then((cat) => {
          json["profession_name"] = pr.data[0].name;
          json["category_name"] = cat.data[0].name;
          json["userId"] = res[i].id;
          list.push(json);
          if (i === res.length - 1) {
            return list;
          }
        });
      });
    }
  });
};

export const util = {
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidPhoneNumber,
  showItem,
  getProfessionAndCategoriesNames,
};
