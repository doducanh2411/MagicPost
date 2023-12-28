"use client";
import "@/css/employee/popup.css";
import { motion } from "framer-motion";
import { createError } from "@/api/utils";
import { useEffect, useState } from "react";
import { setTimeout } from "timers";
import { usePathname, useRouter } from "next/navigation";
import Invoice from "./order/invoice";
import { AiOutlineExclamationCircle } from "react-icons/ai";
export default function PopUp({
  isOpen,
  setIsOpen,
  functionCreate,
  dataCreate,
  print,
  setPrint,
}) {
  const pathname = usePathname();
  const [data, setData] = useState();
  const [confirm, setConfirm] = useState();
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  useEffect(() => {
    setData(null);
    setTimeout(() => setConfirm(false), 1000);
  }, [isOpen]);
  return (
    <>
      <div className="disClick" data-isOpen={isOpen}></div>
      <motion.div layout className="popup" data-isOpen={isOpen}>
        {confirm || (
          <div>
            {pathname.includes("list_ordered") && (
              <div>
                <div className="popupIcon confirm"><AiOutlineExclamationCircle size={'10em'} /></div>
                <div className="popupContent"><h3>Xác nhận tạo đơn hàng</h3></div>
                <div className="popupContent">
                  <p>Bạn sẽ không sửa thông tin đơn hàng sau khi tạo</p>
                </div>
              </div>
            )}
            {pathname.includes("list_employee") && (
              <div>
                <div className="popupIcon confirm"><AiOutlineExclamationCircle size={'3em'} /></div>
                <div className="popupContent">Xác nhận tạo nhân viên</div>
              </div>
            )}
            <div className="popupContent">
              <button
                className="btn btn-danger btn-popup"
                onClick={async () => {
                  setLoading(true);
                  setData(await functionCreate(dataCreate));
                  setConfirm(true);
                  setLoading(false);
                }}
                disabled={loading ? true : false}
              >
                {loading || "Xác nhận"}
                {loading && "Loading"}
              </button>
              <button
                className="btn btn-outline-secondary btn-popup"
                onClick={() => setIsOpen(!isOpen)}
                disabled={loading ? true : false}
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        )}
        {confirm && (
          <div className="popupContent">
            {data?.success && (
              <div>
                <button
                  className="btn btn-primary btn-popup"
                  onClick={() => {
                    route.push(pathname.replace("/create", ""));
                  }}
                >
                  Trờ về trang trước
                </button>
                {pathname.includes("list_ordered") && (
                  <button
                    className="btn btn-primary btn-popup"
                    onClick={() => {
                      setPrint(true);
                      setIsOpen(!isOpen);
                    }}
                  >
                    In hóa đơn
                  </button>
                )}
              </div>
            )}
            {data?.success || (
              <button
                className="btn btn-primary btn-popup"
                onClick={() => setIsOpen(!isOpen)}
              >
                Tạo lại
              </button>
            )}
          </div>
        )}
        {data?.success || <div>{createError[data?.data?.code]}</div>}
        {data?.success && <div>Tao thanh cong</div>}
      </motion.div>
      {print && <Invoice />}
    </>
  );
}
