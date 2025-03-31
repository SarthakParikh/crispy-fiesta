import styles from "./Spacer.module.css";
type SpacerProps = {
  handleClick: () => void;
  showHint: boolean;
};
export const Spcaer = ({ handleClick, showHint }: SpacerProps) => {
  return (
    <div className={styles.spacer} onClick={handleClick}>
      {showHint && <span>Click To Create First Paragraph</span>}
    </div>
  );
};
