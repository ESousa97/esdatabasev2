import ProcedurePages from '../../src/components/Procedures/ProcedurePages';

export default function ProcedurePage() {
  return <ProcedurePages />;
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
