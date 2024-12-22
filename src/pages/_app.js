import MainLayout from "@/components/mainLayout";
import { wrapper } from "@/store";
import { fetchCompanyDetails } from "@/store/companyDetailsSlice";
import { fetchCurrency } from "@/store/currencySlice";


function MyApp({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

// not recommended for every page
// export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
//   // Dispatch actions to fetch company details and currency data for SSR
//   await store.dispatch(fetchCurrency());
//   await store.dispatch(fetchCompanyDetails());

//   // Returning empty props as data will be hydrated in Redux store
//   return { props: {} };
// });



export default wrapper.withRedux(MyApp);;
