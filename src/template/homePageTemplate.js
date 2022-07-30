import exploreIcon from "../utils/images/HomePage/explore.png";
import publishIcon from "../utils/images/HomePage/publish.png";
import supportIcon from "../utils/images/HomePage/support.png";
import { blue, white, earth } from "../utils/colors";

export const introductionTemplate = [
  {
    name: "Explore",
    icon: exploreIcon,
    content: "探索各式各樣跨領域、多元觀點的科技法律專業文章",
    backgroundColor: "rgba(255, 194, 0, 0.3)",
    textColor: blue.dark,
  },
  {
    name: "Publish",
    icon: publishIcon,
    content: "註冊 / 登入後即可發布自己的文章，歡迎各界一同交流",
    backgroundColor: "rgba(149, 63, 44, 0.5)",
    textColor: white.white,
  },
  {
    name: "Support",
    icon: supportIcon,
    content: "遇到喜歡的、有幫助到您的文章，別忘了按下星星給予作者支持喔",
    backgroundColor: "rgba(32, 31, 47, 0.6)",
    textColor: earth.sun,
  },
];
