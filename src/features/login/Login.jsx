import LoginForm from "./components/LoginForm";
import AuthLayout from "../../components/common/layout/AuthLayout";

const Login = () => {
  return (
    <AuthLayout>
    <div className="rounded-3xl bg-slate-50 ring-1 ring-gray-900/10 p-10 mx-0">
      <div className="space-y-20">
        <h1 className="text-3xl font-semibold text-center">Hello, Welcome Back</h1>
        <LoginForm />
      </div>
    </div>
    </AuthLayout>
  );
};

export default Login;
