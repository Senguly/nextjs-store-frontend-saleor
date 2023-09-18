export const formatDay = (input?: any) => {
  const newArr = (input || []).map(item => {
    const dl = item.openDelivery.map((e, index) => ({
      open: e,
      close: item.closeDelivery[index],
    }));
    const pu = item.openPickup.map((e, index) => ({
      open: e,
      close: item.closePickup[index],
    }));

    return {
      day: item.day,
      dl: handleTime(dl),
      pu: handleTime(pu),
    };
  });
  return newArr;
};

export const handleTime = time => {
  const result = [];
  time.sort((a, b) => {
    if (a.open < b.open) {
      return -1;
    }
    if (a.open > b.open) {
      return 1;
    }
    return 0;
  });

  for (let i = 0; i < time.length; i++) {
    if (result.length === 0) {
      result.push(time[i]);
    } else {
      for (let j = 0; j < result.length; j++) {
        if (time[i].open > result[j].close) {
          result.push(time[i]);
          break;
        } else if (
          result[j].close > time[i].open &&
          result[j].close < time[i].close
        ) {
          result[j].close = time[i].close;
        }
      }
    }
  }

  return result;
};

// export const checkArea = (value: string | number, curDelivery: any) => {
//   let result = true;
//   const parseArray = JSON.parse(curDelivery?.currentDelivery?.deliveryArea)
//     ?.areas;
//   for (let i = 0; i < parseArray?.length; i++) {
//     if (
//       Number(parseArray[i].to) >= value &&
//       value >= Number(parseArray[i].from)
//     ) {
//       result = false;
//       break;
//     }
//   }
//   return result;
// };
