import {
  faArrowDown,
  faArrowUp,
  faDollarSign,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Fragment, useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import NumberFormat from "react-number-format";
import { service } from "../service";
import { useWeb } from "../web-context";

export default function Dashboard() {
  const webContext = useWeb();
  const [loading, setLoading] = useState(true);
  const [thisMonthIncome, setThisMonthIncome] = useState(0);
  const [thisMonthOutcome, setThisMonthOutcome] = useState(0);
  const [thisMonthBalance, setThisMonthBalance] = useState(0);
  const [labels, setLabels] = useState([]);
  const [dataOut, setDataOut] = useState([]);
  const [dataIn, setDataIn] = useState([]);
  const [thisMonthBalanceRemaining, setThisMonthBalanceRemaining] = useState(0);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    webContext.dispatch({ type: "titlePage", value: "Dashboard" });
    service
      .get("/stats")
      .then((response) => {
        const {
          thisMonthIncome,
          thisMonthOutcome,
          thisMonthBalance,
          thisMonthBalanceRemaining,
          recentData,
        } = response.data.data;
        if (mounted.current) {
          setThisMonthIncome(thisMonthIncome);
          setThisMonthOutcome(thisMonthOutcome);
          setThisMonthBalance(thisMonthBalance);
          setThisMonthBalanceRemaining(thisMonthBalanceRemaining);

          const month = parseInt(moment().format("M"));
          const year = parseInt(moment().format("YYYY"));

          const labels = [];
          for (
            var monthCountdown = month;
            monthCountdown > month - 6;
            monthCountdown = monthCountdown - 1
          ) {
            let monthNow = monthCountdown;
            let yearNow = year;
            if (monthNow <= 0) {
              monthNow = monthCountdown + 12;
              yearNow = year - 1;
            }

            const getDataIn =
              recentData.find(
                (predicate) =>
                  moment(predicate.actualDate).format("YYYY-M") ===
                    `${yearNow}-${monthNow}` && predicate.status === "in"
              )?.total_amount || 0;
            const getDataOut =
              recentData.find(
                (predicate) =>
                  moment(predicate.actualDate).format("YYYY-M") ===
                    `${yearNow}-${monthNow}` && predicate.status === "out"
              )?.total_amount || 0;
            setDataIn((value) => {
              const temp = value;
              temp.unshift(getDataIn);
              return temp;
            });
            setDataOut((value) => {
              const temp = value;
              temp.unshift(getDataOut);
              return temp;
            });
            labels.unshift(moment(`${yearNow}-${monthNow}-01`).format("MMMM"));
          }
          setLabels(labels);
        }
      })
      .catch((e) => {
        if (mounted.current) {
          setLoading(false);
        }
      });
    return () => {
      mounted.current = false;
    };
  }, []);
  return (
    <Fragment>
      <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-4 gap-3">
        <div className="bg-white flex p-5 items-center">
          <div className="mr-1 flex-1 roboto text-sm text-gray-600">
            Pemasukan Bulan Ini
            <NumberFormat
              className="text-xl block font-bold text-gray-700 overflow-hidden w-full"
              thousandSeparator={true}
              prefix="Rp"
              displayType="text"
              value={thisMonthIncome}
            />
          </div>
          <span className="text-lg text-green-600">
            <FontAwesomeIcon icon={faArrowDown} />
          </span>
        </div>
        <div className="bg-white flex p-5 items-center">
          <div className="mr-1 flex-1 roboto text-sm text-gray-600">
            Pengeluaran Bulan Ini
            <NumberFormat
              thousandSeparator={true}
              prefix="Rp"
              displayType="text"
              className="text-xl block font-bold text-gray-700 overflow-hidden w-full"
              value={thisMonthOutcome}
            />
          </div>
          <span className="text-lg text-red-600">
            <FontAwesomeIcon icon={faArrowUp} />
          </span>
        </div>
        <div className="bg-white flex p-5 items-center">
          <div className="mr-1 flex-1 roboto text-sm text-gray-600">
            Saldo Awal
            <NumberFormat
              thousandSeparator={true}
              prefix="Rp"
              displayType="text"
              className="text-xl block font-bold text-gray-700 overflow-hidden w-full"
              value={thisMonthBalance}
            />
          </div>
          <span className="text-lg text-yellow-500">
            <FontAwesomeIcon icon={faDollarSign} />
          </span>
        </div>
        <div className="bg-white flex p-5 items-center">
          <div className="mr-1 flex-1 roboto text-sm text-gray-600">
            Sisa Saldo
            <NumberFormat
              thousandSeparator={true}
              className="text-xl block font-bold text-gray-700 overflow-hidden w-full"
              prefix="Rp"
              displayType="text"
              value={thisMonthBalanceRemaining}
            />
          </div>
          <span className="text-lg text-blue-600">
            <FontAwesomeIcon icon={faWallet} />
          </span>
        </div>
      </div>
      <div className="bg-white p-5 mt-3">
        <Line
          data={{
            labels,
            datasets: [
              {
                label: "Pengeluaran",
                data: dataOut,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
              },
              {
                label: "Pemasukan",
                data: dataIn,
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
              },
            ],
          }}
          height={300}
          options={{
            aspectRatio: 2,
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </Fragment>
  );
}
