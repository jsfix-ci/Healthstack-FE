import React from 'react';

import { useObjectState } from '../../../../context/context';
import CollectionCreate from './CollectionCreate';
import CollectionDetails from './CollectionDetail';
import CollectionModify from './CollectionModify';

const AppCollectionClient = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.collectionsResource.show === 'create' && (
        <CollectionCreate
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              collectionsResource: {
                ...prevState.collectionsResource,
                show: 'lists',
              },
            }))
          }
        />
      )}
      {resource.collectionsResource.show === 'details' && (
        <CollectionDetails
          row={resource.collectionsResource.selectedCollection}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              collectionsResource: {
                ...prevState.collectionsResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              collectionsResource: {
                ...prevState.collectionsResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
      {resource.collectionsResource.show === 'edit' && (
        <CollectionModify
          row={resource.collectionsResource.selectedCollection}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              collectionsResource: {
                ...prevState.collectionsResource,
                show: 'lists',
              },
            }))
          }
          cancelEditClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'details',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppCollectionClient;
