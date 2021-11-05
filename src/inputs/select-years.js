const SelectYears = () => {
  const minOffset = 0,
    maxOffset = 30;
  const thisYear = new Date().getFullYear();
  const allYears = [];
  for (let x = minOffset; x <= maxOffset; x++) {
    allYears.push(thisYear - x);
  }

  const yearList = allYears.map((x) => {
    return <option key={x}>{x}</option>;
  });
  return (
      <select>{yearList}</select>
  );
};

export default SelectYears;
