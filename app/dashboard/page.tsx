"use client";

import React, { useState } from "react";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import axios from "axios";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";

const NewProjectForm = () => {
  const { data } = useSession();
  const [source, setSource] = useState(
    "https://res.cloudinary.com/dvovo1lfg/video/upload/v1742034353/jahqycvxbqjc4q4yicc9.mp4"
  );
  const formSchema = z.object({
    query: z.string().min(3, "Query must be at least 3 characters long"),
  });

  type FormType = z.infer<typeof formSchema>;

  const form = useForm<FormType>({
    defaultValues: {
      query: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormType) => {
    try {
      const res = await axios.post("http://localhost:5000/query-upload", {
        query: data.query,
      });
      console.log(res.data);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="flex items-center mb-4 text-3xl font-semibold text-secondary-foreground/70 mt-4">
        Machine Learning Query
      </h2>
      <Card className="pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">
                        Enter Your Query
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Explain linear regression"
                          className="bg-custom2 p-6"
                          // disabled={projectMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full text-foreground bg-blue-700 py-6"
              >
                {/* {projectMutation.isPending ? "Creating..." : "Create"} */}
                Create
              </Button>
            </CardContent>
          </form>
        </Form>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="rounded-lg overflow-hidden">
            <ReactPlayer url={source} controls width="100%" height="680px" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewProjectForm;
