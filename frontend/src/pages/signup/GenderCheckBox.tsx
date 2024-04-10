export interface IGenderCheckbox {
  onCheckBoxChange: (gender: string) => void;
  selectedGender: string;
}

const GenderCheckbox = ({
  onCheckBoxChange,
  selectedGender,
}: IGenderCheckbox) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text">Male</span>
          <input
            onChange={() => onCheckBoxChange("male")}
            checked={selectedGender === "male"}
            type="checkbox"
            className="checkbox border-slate-900"
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text">Female</span>
          <input
            onChange={() => onCheckBoxChange("female")}
            checked={selectedGender === "female"}
            type="checkbox"
            className="checkbox border-slate-900"
          />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;
