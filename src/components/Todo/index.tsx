import React, { FC, useRef, useState } from 'react';
import clsx from 'clsx';
import { Formik, Form, Field, FormikHelpers, FormikProps } from 'formik';
import dayjs from 'dayjs';

import { TodoProps } from './Todo.types';
import { DeleteIcon, EditIcon } from 'components/icons';
import { deleteTodo, editTodo, completeTodo } from 'store/todos/todos.asyncActions';
import { useAppDispatch } from 'store/store.hooks';
import { handleFileUpload } from 'core/utils/handleFileUpload';
import { Button } from 'components/UI/Button';

import styles from './Todo.module.scss';

export const Todo: FC<{ todo: TodoProps }> = ({ todo }) => {
  const { id, title, description, completed, attachment, attachmentName, attachmentLink, date } = todo;
  const [isEditMode, setIsEditMode] = useState(false);
  const formRef = useRef<FormikProps<any>>(null);
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
    files: attachment,
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
        innerRef={formRef}
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
              <div className={styles.title}>Задача</div>
              <Field type="text" id="title" name="title" className={styles.input} disabled={!isEditMode} />
              <div className={styles.title}>Подробное описание</div>
              <Field
                as="textarea"
                id="description"
                name="description"
                className={clsx(styles.input, styles.description)}
                disabled={!isEditMode}
              />
              <div className={styles.title}>Дедлайн</div>
              <Field
                type="date"
                id="date"
                name="date"
                className={clsx(styles.date, dayjs(values.date) < dayjs() && styles.dateExpired)}
                disabled={!isEditMode}
              />

              {isEditMode && (
                <div className={styles.upload}>
                  <label htmlFor="files" className={styles.uploadLabel}>
                    Прикрепить файл
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
              )}

              {/* {values.files?.length > 0 ? (
                <div>
                  <div className={styles.title}>Выбранные файлы</div>
                  <ul className={styles.description}>
                   {values.files?.map((file,i) => (
                      <li key={i} className={styles.fileItem}>
                        {file.name}
                      </li>
                    ))} 
                  </ul>
                </div>
              ) : null} */}

              {attachmentName && (
                <div>
                  <div className={styles.title}>Прикрепленный файл</div>
                  <ul className={styles.description}>
                    <li>
                      <a href={attachmentLink} target="_blank" rel="noreferrer">
                        {attachmentName}
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className={styles.buttons}>
              {isEditMode && <Button type="submit">Сохранить</Button>}
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
