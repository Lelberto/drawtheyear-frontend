import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../../hooks/fetch-hook';
import { Config } from '../../util/config';
import { LocalStorageKey } from '../../util/types/local-storage';
import { GetUserResponse, RefreshTokenResponse } from '../../util/types/response-types';
import { Button } from '../button';
import { AuthenticationContext } from '../contexts/authentication-context';
import { SigninForm, SigninFormValues } from './signin-form';
import Daydotted from '../../assets/img/daydotted.png'

/**
 * Signin container.
 * 
 * This container manages the signin system.
 */
export const SigninContainer: React.FC = () => {
  const [refreshTokenQuery, refreshTokenQueryState] = useFetch<RefreshTokenResponse>(`${Config.API_URL}/auth/refreshToken`);
  const [userInfoQuery, userInfoQueryState] = useFetch<GetUserResponse>(`${Config.API_URL}/users/info`);
  const authenticationContext = useContext(AuthenticationContext);
  const history = useHistory();

  useEffect(() => {
    if (refreshTokenQueryState.fetched) {
      if (refreshTokenQueryState.data) {
        localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, refreshTokenQueryState.data.refresh_token);
        localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, refreshTokenQueryState.data.access_token);
        userInfoQuery.get();
      } else {
        console.error(refreshTokenQueryState.errors);
      }
    }
  }, [refreshTokenQueryState.fetched]);

  useEffect(() => {
    if (userInfoQueryState.fetched) {
      if (userInfoQueryState.data) {
        authenticationContext.setAuthUser(userInfoQueryState.data.user);
      } else {
        console.error(userInfoQueryState.errors);
      }
    }
  }, [userInfoQueryState.fetched]);

  useEffect(() => {
    if (authenticationContext.authUser) {
      history.goBack();
    }
  }, [authenticationContext.authUser]);

  const handleSubmitSigninForm = (data: SigninFormValues) => {
    refreshTokenQuery.post(null, data);
  }

  return (
    <div className="lg:grid lg:grid-cols-5 lg:gap-4 w-full">
      <div className="lg:col-span-3">
        <div className="flex flex-col justify-center">
          <div className="flex flex-col mx-auto my-0">
            <div className="text-3xl md:text-4xl xl:text-5xl  xl:pt-36 pt-20 ">
              Connectez-vous pour
            </div>
            <div className="text-3xl md:text-4xl xl:text-5xl ">
              Commencer ?? ??crire
            </div>
            <div className="text-xl mt-8 flex flex-col text-gray-400 self-center">
              Si vous n'avez pas de compte
            </div>
            <div className="text-gray-400 flex flex-row items-center self-center">
              <span>Vous pouvez vous</span> <Button href="/signup"><span className="text-yellow-600 hover:border-b-2 border-solid hover:border-yellow-500 hover:text-yellow-500 cursor-pointer">Inscrire ici</span></Button>
            </div>
            <div className="w-60 mt-8 self-center">
              <img src={Daydotted} alt="Day dotted"/>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="flex flex-col justify-center ">
          <SigninForm onSubmit={handleSubmitSigninForm} />
        </div>
      </div>
    </div>
  );
}
