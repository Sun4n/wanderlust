"use client";

import {AlertDialog, Button} from "@heroui/react";
import { redirect } from "next/navigation";

export function DeleteModal({destination}) {
     const { _id, destinationName, imageUrl, price, duration, country, departureDate, description, category } = destination
    const handleDelete = async()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${_id}`,{
            method:'DELETE',
            headers:{
                'content-type':'application/json'
            }
        })
        const data = await res.json()
        console.log(data);
        redirect('/destination')
    }
  return (
    <AlertDialog>
      <Button variant="danger">Delete</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{destinationName}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete Project
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}