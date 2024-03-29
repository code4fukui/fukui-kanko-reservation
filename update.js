import { CSV } from "https://js.sabae.cc/CSV.js";
import { Day, TimeZone } from "https://js.sabae.cc/DateTime.js";

const domain = Deno.args[0];
const getLatestHotelApi = domain + Deno.args[1];
const getLatestRsvSumApi = domain + Deno.args[2];
const getLatestRsvPrefectureSumApi = domain + Deno.args[3];
const getBookingCurveApi = domain + Deno.args[4];

const hotelData = await (await fetch(getLatestHotelApi)).json();
await Deno.writeTextFile("latest_hotel.csv", CSV.stringify(hotelData));

const latestRsvSumData = await (await fetch(getLatestRsvSumApi)).json();
await Deno.writeTextFile("latest_rsv_sum.csv", CSV.stringify(latestRsvSumData));

const backupLatestRsvSumData = latestRsvSumData.filter(d => {
    return d.date_visit >= new Day(TimeZone.JST).toString()
});
await Deno.writeTextFile("data/" + new Day(TimeZone.JST).toString() + ".csv", CSV.stringify(backupLatestRsvSumData));

const latestRsvPrefectureSumData = await (await fetch(getLatestRsvPrefectureSumApi)).json();
await Deno.writeTextFile("latest_rsv_prefecture_sum.csv", CSV.stringify(latestRsvPrefectureSumData));

const latestBookingCurveData = await (await fetch(getBookingCurveApi)).json();
await Deno.writeTextFile("booking_curve.csv", CSV.stringify(latestBookingCurveData));
