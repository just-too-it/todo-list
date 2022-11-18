import React from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import clsx from 'clsx';

import { handleFileUpload } from 'core/utils/handleFileUpload';
import { addTodo } from 'store/todos/todos.asyncActions';
import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { Button } from 'components/UI/Button';
import { selectTodos } from 'store/todos/todos.selectors';

import styles from './Add.module.scss';

export const Add = () => {
  const { todos } = useAppSelector(selectTodos);

  const dispatch = useAppDispatch();

  interface Values {
    addTitle: string;
    addDescription: string;
    addFiles: any[];
  }

  const initValues: Values = {
    addTitle: '',
    addDescription: '',
    addFiles: [],
  };

  return (
    <>
      <Formik
        initialValues={initValues}
        validateOnChange={true}
        validateOnBlur={false}
        onSubmit={(values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
          setTimeout(async () => {
            console.log(JSON.stringify(values, null, 2));
            dispatch(
              addTodo({
                id: todos.length + 1,
                title: values.addTitle,
                completed: false,
                description: values.addDescription,
                attachment: values.addFiles,
              })
            );
            setSubmitting(false);
            resetForm();
          }, 500);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className={styles.form}>
            <fieldset>
              <legend>Добавьте новую задачу</legend>
              <div className={styles.content}>
                <div className={styles.title}>Задача</div>
                <Field type="text" id="addTitle" name="addTitle" className={styles.input} />
                <div className={styles.title}>Подробное описание</div>
                <Field
                  as="textarea"
                  id="addDescription"
                  name="addDescription"
                  className={clsx(styles.input, styles.description)}
                />

                <div className={styles.upload}>
                  <label htmlFor="addFiles" className={styles.uploadLabel}>
                    Выбрать файлы
                  </label>
                  <input
                    id="addFiles"
                    name="addFiles"
                    type="file"
                    onChange={(event) => handleFileUpload(event, setFieldValue, 'addFiles')}
                    multiple
                    className={styles.file}
                  />
                </div>

                {values.addFiles?.length > 0 ? (
                  <div>
                    <div className={styles.title}>Выбранные файлы</div>
                    <ul className={styles.description}>
                      {values.addFiles?.map((file) => (
                        <li key={file.size} className={styles.fileItem}>
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
              <div className={styles.buttons}>
                <Button type="submit">Добавить задачу</Button>
              </div>
            </fieldset>
          </Form>
        )}
      </Formik>
    </>
  );
};
