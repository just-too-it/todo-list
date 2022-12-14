import React, { FC, useState } from 'react';
import clsx from 'clsx';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import dayjs from 'dayjs';

import { TodoProps } from './Todo.types';
import { DeleteIcon, EditIcon } from 'components/icons';
import { deleteTodo, editTodo, completeTodo } from 'store/todos/todos.asyncActions';
import { useAppDispatch } from 'store/store.hooks';
import { handleFileUpload } from 'core/utils/handleFileUpload';
import { Button } from 'components/UI/Button';

import styles from './Todo.module.scss';

export const Todo: FC<{ todo: TodoProps }> = ({ todo }) => {
  const { id, title, description, completed, date, files } = todo;
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useAppDispatch();

  interface Values {
    title: string;
    description: string;
    complete: boolean;
    files: any[];
    date: string;
  }

  const initValues: Values = {
    title: title,
    description: description,
    complete: completed,
    files: files,
    date: date,
  };

  const handleCheck = (setValue, check: boolean) => {
    dispatch(completeTodo(id));
    setValue('complete', !check);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };

  return (
    <>
      <Formik
        initialValues={initValues}
        validateOnChange={true}
        validateOnBlur={false}
        onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          setTimeout(async () => {
            dispatch(
              editTodo({
                id: id,
                title: values.title,
                description: values.description,
                completed: values.complete,
                attachment: values.files,
                date: values.date,
              })
            );
            setIsEditMode(false);
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className={clsx(styles.form, completed && styles.formDisabled)}>
            {!isEditMode && (
              <Field
                id="complete"
                name="complete"
                type="checkbox"
                onChange={() => handleCheck(setFieldValue, values.complete)}
                className={clsx(completed ? styles.checkboxDone : styles.checkbox)}
              />
            )}
            <div className={styles.content}>
              <div className={styles.title}>????????????</div>
              <Field type="text" id="title" name="title" className={styles.input} disabled={!isEditMode} />
              <div className={styles.title}>?????????????????? ????????????????</div>
              <Field
                as="textarea"
                id="description"
                name="description"
                className={clsx(styles.input, styles.description)}
                disabled={!isEditMode}
              />
              <div className={styles.title}>??????????????</div>
              <Field
                type="date"
                id="date"
                name="date"
                className={clsx(styles.date, dayjs(values.date) < dayjs() && styles.dateExpired)}
                disabled={!isEditMode}
              />

              {isEditMode && (
                <>
                  <div className={styles.upload}>
                    <label htmlFor="files" className={styles.uploadLabel}>
                      ???????????????????? ??????????
                    </label>
                    <input
                      id="files"
                      name="files"
                      type="file"
                      onChange={(event) => handleFileUpload(event, setFieldValue, 'files')}
                      multiple
                      disabled={completed}
                      className={styles.file}
                    />
                  </div>
                  {values.files?.length > 0 && (
                    <div>
                      <div className={styles.title}>?????????????????????????? ??????????</div>
                      <ul className={styles.description}>
                        {values.files.length === 0
                          ? files?.map((file, i) => (
                              <li key={i} className={styles.fileItem}>
                                <a href={file.fileLink} target="_blank" rel="noreferrer">
                                  {file.fileName}
                                </a>
                              </li>
                            ))
                          : values.files?.map((file, i) => (
                              <li key={i} className={styles.fileItem}>
                                {file.name}
                              </li>
                            ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
              {files?.length > 0 && !isEditMode && (
                <div>
                  <div className={styles.title}>?????????????????????????? ??????????</div>
                  <ul className={styles.description}>
                    {files?.map((file, i) => (
                      <li key={i} className={styles.fileItem}>
                        <a href={file.fileLink} target="_blank" rel="noreferrer">
                          {file.fileName}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className={styles.buttons}>
              {isEditMode && <Button type="submit">??????????????????</Button>}
              {!isEditMode && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditMode(true);
                    }}
                    className={clsx(styles.button, styles.edit)}
                    disabled={completed}
                  >
                    <EditIcon width={32} height={32} fill={'#185abc'} />
                  </button>
                  <button type="button" onClick={handleDelete} className={clsx(styles.button, styles.delete)}>
                    <DeleteIcon width={32} height={32} fill={'grey'} />
                  </button>
                </>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
