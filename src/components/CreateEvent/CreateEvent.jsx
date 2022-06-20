import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { Formik } from "formik";
import * as Yup from "yup"


import "./style.scss";

const CreateEvent = ({ submit }) => {
  return (
    <div className="create-event">
      <Formik
        initialValues={{ title: '', type: "low" }}
        validationSchema={Yup.object({
          title: Yup.string()
            .required('Поле обязательно для заполнения'),
        })
        }
        onSubmit={values => {
          submit(values);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div className="create-event__row">
              <Input
                placeholder="Добавьте название"
                fullWidth={true}
                onChange={props.handleChange}
                value={props.values.title}
                name="title"
              />
            </div>
            <div className="create-event__row">
              <FormLabel id="demo-row-radio-buttons-group-label">
                Приоритет
              </FormLabel>
              <RadioGroup
                row
                name="type"
                value={props.values.type}
                onChange={props.handleChange}
              >
                <FormControlLabel
                  value="low"
                  control={<Radio  />}
                  label="Низкий"
                />
                <FormControlLabel
                  value="middle"
                  control={<Radio  />}
                  label="Средний"
                />
                <FormControlLabel
                  value="high"
                  control={<Radio  />}
                  label="Высокий"
                />
              </RadioGroup>
            </div>
            <Button type="submit" variant="contained">
              Сохранить
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEvent;
