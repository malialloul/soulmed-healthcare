import { welcomeConroller } from "../controllers/welcome-page";
import moment from "moment";

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
    show = true;
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
const sameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const getDayDate = (i) => {
  let dt = new Date();
  let currentWeekDay = dt.getDay();
  let lessDays = currentWeekDay === 0 ? 6 : currentWeekDay - 1;
  let wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
  let wkDay = new Date(new Date(wkStart).setDate(wkStart.getDate() + i));

  return wkDay;
};

const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

const isOverlapping = (event, events) => {
  for (let i in events) {
    if (
      events[i].id !== event.id &&
      sameDay(new Date(events[i].start), new Date(event.start))
    ) {
      if (
        new Date(event.start) < new Date(events[i].end) &&
        new Date(events[i].start) < new Date(event.end)
      ) {
        return true;
      }
    }
  }
  return false;
};

const inSubRange = (event, events) => {
  for (let i in events) {
    if (sameDay(new Date(events[i].start), new Date(event.start))) {
      if (
        new Date(event.start) >= new Date(events[i].start) &&
        new Date(events[i].end) >= new Date(event.end)
      ) {
        return true;
      }
    }
  }
  return false;
};



const getSubrangeIndex = (event, events) => {
  let j = -1;

  for (let i in events) {
    if (
      events[i].id !== event.id &&
      sameDay(new Date(events[i].start), new Date(event.start))
    ) {
      if (
        new Date(event.start) >= new Date(events[i].start) &&
        new Date(events[i].end) >= new Date(event.end)
      ) {
        j = i;
      }
    }
  }
  return j;
};

const isValidTimingInterval = (start, end) => {
  return start < end;
};

export const util = {
  sameDay,
  isValidEmail,
  inSubRange,
  isValidName,
  isValidPassword,
  isValidPhoneNumber,
  showItem,
  getProfessionAndCategoriesNames,
  getDayDate,
  isToday,
  isOverlapping,
  isValidTimingInterval,
  getSubrangeIndex,
};
