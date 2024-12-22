// components/MainLayout.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyDetails } from "@/store/companyDetailsSlice";
import { fetchCurrency } from "@/store/currencySlice";

const MainLayout = ({ children }) => {
    const dispatch = useDispatch();
    const companyDetails = useSelector((state) => state.companyDetails);
    const currency = useSelector((state) => state.currency);

    useEffect(() => {
        if (!companyDetails) {
            dispatch(fetchCompanyDetails());
        }
        if (!currency) {
            dispatch(fetchCurrency());
        }
    }, [dispatch, companyDetails, currency]);

    // You can show a loading state if the data is still being fetched
    if (!companyDetails || !currency) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {/* Render the company details and currency */}
            <header>
                <h1>{companyDetails.name}</h1>
                <p>{currency.symbol}</p>
            </header>

            {/* Render children (actual page content) */}
            <main>{children}</main>
        </div>
    );
};

export default MainLayout;
