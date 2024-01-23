import React from "react";
import { css } from "@emotion/react";
import colors from "../../utils/colors";

const Header = ({ back = false, title }) => {
  return (
    <div css={styles.container}>
      <div css={styles.mainContainer}>
        <div css={styles.title}>{title}</div>
      </div>
    </div>
  );
};

const styles = {
  container: css`
    background-color: ${colors.white};
    height: 60px;
  `,
  icon: css`
    margin-right: 0;
  `,
  mainContainer: css`
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: ${colors.purple};
    position: relative;
  `,
  backButton: css`
    position: absolute;
    left: 20px;
  `,
  title: css`
    color: ${colors.white};
    font-weight: bold;
    font-size: 22px;
    text-align: center;
    padding-bottom: 5px;
    padding-top: 5px;
  `,
};

export default Header;
