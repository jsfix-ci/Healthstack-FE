import React, { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import DetailView from '../../generic/DetailView';
import FormView from '../../generic/FormView';
import ListView from '../../generic/ListView';
import { FormType } from '../../schema/util';
import { querySignal } from '../query';
import { SignalSchema } from '../schema';

const AppSignal = () => {
  const { resource, setResource } = useObjectState();
  const [searchText, setSearchText] = useState();
  const {
    signalResource: { selectedSignal },
  } = resource;

  const navigate = (show: string) => (selectedsignal?: any) =>
    setResource({
      ...resource,
      signalResource: {
        ...resource.signalResource,
        show,
        selectedSignal: show === FormType.CREATE ? {} : selectedsignal,
      },
    });

  const { list, remove, submit, setFindQuery, facility } = useRepository<any>(
    Models.CASE_DEFINITION,
    navigate,
  );

  const onSubmit = async (data) => {
    const { findings, labs, symptoms } = data;
    data.observations = [];
    data.disease = {
      name: data.disease,
      icdcode: '',
      icdver: '',
      snomed: '',
      snomedver: '',
    };

    if (data.notificationtype === '') {
      alert('Kindly choose notification type');
      return;
    }
    if (symptoms.length > 0) {
      const sympcollection = [];
      symptoms.forEach((obj) => {
        const obs = {
          category: 'symptoms',
          name: obj.symptom,
          duration: obj.duration,
          required: obj.sympreq,
        };
        sympcollection.push(obs);
      });
      data.observations = [...data.observations, ...sympcollection];
    }
    if (findings.length > 0) {
      const findingscollection = [];
      findings.forEach((el) => {
        const obs = {
          category: 'Signs',
          name: el.finding,
          required: el.findingreq,
        };
        findingscollection.push(obs);
      });
      data.observations = [...data.observations, ...findingscollection];
    }
    if (labs.length > 0) {
      const labscollection = [];
      labs.forEach((el) => {
        const obs = {
          category: 'Laboratory',
          name: el.lab,
          value: el.labvalue,
        };
        labscollection.push(obs);
      });
      data.observations = [...data.observations, ...labscollection];
    }
    const notifiedlist = [];
    notifiedlist.push(data.notifiedPerson);
    data.notification_destination = notifiedlist[0];
    data.facility = facility._id;
    submit(data);
  };

  useEffect(() => {
    if (facility && facility._id) {
      setFindQuery(querySignal(facility._id, undefined));
    }
  }, [facility]);

  useEffect(() => {
    setFindQuery(querySignal(facility._id, searchText));
  }, [searchText]);

  return (
    <>
      {resource.signalResource.show === FormType.LIST && (
        <ListView
          title="Case Definition"
          schema={SignalSchema}
          handleCreate={navigate(Views.CREATE)}
          handleSearch={setSearchText}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          items={list}
        />
      )}
      {(resource.signalResource.show === FormType.CREATE ||
        resource.signalResource.show === FormType.EDIT) && (
        <FormView
          title="Case Definition"
          schema={SignalSchema}
          backClick={navigate(Views.LIST)}
          onSubmit={onSubmit}
          selectedData={selectedSignal}
        />
      )}
      {resource.signalResource.show === FormType.DETAIL && (
        <DetailView
          title="Case Definition"
          schema={SignalSchema}
          value={selectedSignal}
          backClick={navigate(Views.LIST)}
          onEdit={() => navigate(Views.EDIT)(selectedSignal)}
          onDelete={() => remove(selectedSignal)}
        />
      )}
    </>
  );
};

export default AppSignal;
