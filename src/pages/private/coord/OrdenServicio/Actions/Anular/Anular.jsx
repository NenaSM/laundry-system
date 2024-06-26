/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { DateCurrent } from "../../../../../../utils/functions";
import "./anular.scss";

const Anular = ({ onReturn, onAnular }) => {
  const validationSchema = Yup.object().shape({
    motivo: Yup.string().required("Ingrese motivo de Anulacion"),
  });

  const openModal = (values) => {
    let confirmationEnabled = true;
    modals.openConfirmModal({
      title: "Confirmar Anulacion",
      centered: true,
      children: (
        <Text size="sm">¿ Estas seguro que quiere de ANULAR este pedido?</Text>
      ),
      labels: { confirm: "Si", cancel: "No" },
      confirmProps: { color: "red" },
      //onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        if (confirmationEnabled) {
          confirmationEnabled = false;
          onAnular(values);
        }
      },
    });
  };

  return (
    <div className="container-anulacion">
      <Formik
        initialValues={{
          motivo: "",
          fecha: DateCurrent().format4,
          hora: DateCurrent().format3,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          openModal(values);
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, isSubmitting, errors, touched }) => (
          <Form onSubmit={handleSubmit} className="body-a">
            <div className="content-anuacion">
              <Field
                placeholder="Motivo de la anulacion"
                className="description-info"
                as="textarea"
                name="motivo"
                cols="30"
                rows="10"
              />
              {errors.motivo && touched.motivo && (
                <div className="ico-req">
                  <i className="fa-solid fa-circle-exclamation ">
                    <div className="info-req" style={{ pointerEvents: "none" }}>
                      <span>{errors.motivo}</span>
                    </div>
                  </i>
                </div>
              )}
            </div>
            <div className="actions-bottom">
              <button type="submit" disabled={isSubmitting} className="btn-exm">
                Anular
              </button>
              <button
                type="button"
                className="btn-exm"
                onClick={() => onReturn("principal")}
              >
                Retroceder
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Anular;
