import React, { FC, useRef, useState } from 'react';
import styles from './Todo.module.scss';
import { TodoProps } from './Todo.types';
import { Formik, Form, Field, FormikHelpers, FormikProps } from 'formik';
import clsx from 'clsx';
import { CheckboxIcon, DeleteIcon, EditIcon } from 'components/icons';

export const Todo: FC<{ todo: TodoProps }> = ({ todo }) => {
  const { title, description, complete, attachment } = todo;
  const [isEditMode, setIsEditMode] = useState(false);
  const [isComplete, setIsComplete] = useState(complete);
  const formRef = useRef<FormikProps<any>>(null);

  interface Values {
    title: string;
    description: string;
    complete: boolean;
    files: any[];
  }

  const initValues: Values = {
    title: title,
    description: description,
    complete: isComplete,
    files: attachment,
  };

  const handleCheck = (setValue, name: string, status: boolean) => {
    setIsComplete((isComplete) => !isComplete);
    setValue(name, status);
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const handleFileUpload = (event, setValue) => {
    const files = event.target.files;
    const arrayFiles = Array.from(files);
    setValue('files', arrayFiles);
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
            console.log(JSON.stringify(values, null, 2));
            // postData('URL', values);
            setIsEditMode(false);
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className={clsx(styles.form, isComplete && styles.formDisabled)}>
            <Field
              id="complete"
              name="complete"
              type="checkbox"
              onChange={() => handleCheck(setFieldValue, 'complete', !isComplete)}
              className={clsx(isComplete ? styles.checkboxDone : styles.checkbox)}
            />
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
              {isEditMode && <div className={styles.upload}>
                <label htmlFor="files" className={styles.uploadLabel}>
                Выбрать файлы
              </label>
              <input
                id="files"
                name="files"
                type="file"
                onChange={(event) => handleFileUpload(event, setFieldValue)}
                multiple
                disabled={isComplete}
                className={styles.file}
              />
              </div>}
              
              {values.files?.length > 0 ? (
                <div>
                    <div className={styles.title}>Выбранные файлы</div>
                    <ul className={styles.description}>
                    {values.files?.map((file) => (
                    <li key={file.size} className={styles.fileItem}>{file.name}</li>
                  ))}
                    </ul>
                  
                </div>
              ) : null}

              
            </div>
            <div className={styles.buttons}>
              {isEditMode && (
                <button type="submit" className={clsx(styles.button, styles.save)}>
                  Сохранить
                </button>
              )}
              {!isEditMode && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditMode(true);
                    }}
                    className={clsx(styles.button, styles.edit)}
                    disabled={isComplete}
                  >
                    <EditIcon width={32} height={32} fill={'#185abc'} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      console.log('delete')
                    }}
                    className={clsx(styles.button, styles.delete)}
                    disabled={isComplete}
                  >
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
