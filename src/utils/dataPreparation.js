export const dataPreparationTradeValueAndVolume = (data) =>
  data.map((item) => getPreparedItem(item));

export const getPreparedItem = (item) => {
  if (item.length === 1) {
    return {
      time: Math.floor(new Date(`${item[0]}Z`).getTime() / 1000),
    };
  }
  return {
    time: Math.floor(new Date(`${item[0]}Z`).getTime() / 1000),
    value: item[1],
    volume: item[2],
  };
};

export const getCandleStickData = (data, intervalSeconds = 5) => {
  const candlestickData = [];
  let currentCandlestick = null;

  for (const [time, price, volume] of data) {
    const timestamp = new Date(`${time}Z`).getTime() / 1000;
    const candlestickTime =
      Math.floor(timestamp / intervalSeconds) * intervalSeconds;

    if (!currentCandlestick || currentCandlestick.time !== candlestickTime) {
      if (currentCandlestick) {
        candlestickData.push(currentCandlestick);
      }

      currentCandlestick = {
        time: candlestickTime,
        open: price,
        close: price,
        high: price,
        low: price,
      };
    } else {
      currentCandlestick.close = price;
      currentCandlestick.high = Math.max(currentCandlestick.high, price);
      currentCandlestick.low = Math.min(currentCandlestick.low, price);
    }
  }

  if (currentCandlestick) {
    candlestickData.push(currentCandlestick);
  }

  return candlestickData;
};

export const getPriceGraphDataForTimeInterval = (
  data,
  intervalInSeconds = 5
) => {
  const priceGraphData = [];
  let currentPriceData = null;

  for (const [time, value, volume] of data) {
    const timestamp = new Date(`${time}Z`).getTime() / 1000;
    const priceDataTime =
      Math.floor(timestamp / intervalInSeconds) * intervalInSeconds;

    if (!currentPriceData || currentPriceData.time !== priceDataTime) {
      if (currentPriceData) {
        priceGraphData.push(currentPriceData);
      }

      currentPriceData = {
        time: priceDataTime,
        value,
        volume,
      };
    } else {
      currentPriceData.value = value;
      currentPriceData.volume = volume;
    }
  }

  if (currentPriceData) {
    priceGraphData.push(currentPriceData);
  }

  return priceGraphData;
};

export const combinePriceDataUnique = (...arrays) => {
  const timestamps = arrays.map((array) => array.map((item) => item[0]));

  const commonTimestamps = timestamps.reduce(
    (accumulator, currentTimestamps) => {
      return accumulator.filter((timestamp) =>
        currentTimestamps.includes(timestamp)
      );
    }
  );

  const combinedData = commonTimestamps.map((timestamp) => {
    const combinedItem = arrays.reduce(
      (accumulator, currentArray) => {
        const item = currentArray.find((item) => item[0] === timestamp);
        accumulator[1] += item[1];
        accumulator[2] += item[2];
        return accumulator;
      },
      [timestamp, 0, 0]
    );

    return combinedItem;
  });

  return combinedData;
};
