import React from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';

import { handleFileUpload } from 'core/utils/handleFileUpload';
import { addTodo } from 'store/todos/todos.asyncActions';
import { useAppDispatch } from 'store/store.hooks';
import { Button } from 'components/UI/Button';

import styles from './Add.module.scss';

export const Add = () => {
  const dispatch = useAppDispatch();

  interface Values {
    addTitle: string;
    addDescription: string;
    addFiles: any[];
    addDate: string;
  }

  const initValues: Values = {
    addTitle: '',
    addDescription: '',
    addFiles: [],
    addDate: '',
  };

  return (
    <>
      <Formik
        initialValues={initValues}
        validateOnChange={true}
        validateOnBlur={false}
        onSubmit={(values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
          setTimeout(async () => {
            dispatch(
              addTodo({
                id: uuidv4(),
                title: values.addTitle,
                completed: false,
                description: values.addDescription,
                attachment: values.addFiles,
                date: values.addDate,
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
                <div className={styles.date}>Задайте дедлайн</div>
                <Field type="date" id="addDate" name="addDate" className={clsx(styles.input, styles.deadline)} />
                <div className={styles.upload}>
                  <label htmlFor="addFiles" className={styles.uploadLabel}>
                    Прикрепить файл
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
                    <div className={styles.title}>Прикрепленный файл</div>
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
