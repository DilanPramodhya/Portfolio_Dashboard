import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  clearAllApplicationErrors,
  deleteApplication,
  getAllSoftwareApplications,
  resetApplicationsSlice,
} from "@/store/slices/softwareApplicationSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingButton from "./LoadingButton";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.project);
  const { skills } = useSelector((state) => state.skill);
  const { softwareApplications, message, error, loading } = useSelector(
    (state) => state.application
  );
  const { timeline } = useSelector((state) => state.timeline);

  const [appId, setAppId] = useState("");

  const dispatch = useDispatch();

  const handleDeleteApp = (id) => {
    setAppId(id);
    dispatch(deleteApplication(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationsSlice());
      dispatch(getAllSoftwareApplications());
    }
  }, [dispatch, message, error, loading]);

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3 gap-6">
                  <CardDescription className="">{user.aboutMe}</CardDescription>
                  <CardFooter className="text-end justify-center">
                    <Link
                      to={user.portfolioURL && user.portfolioURL}
                      target="_blank"
                    >
                      <Button>Visit Portfolio</Button>
                    </Link>
                  </CardFooter>
                </CardHeader>
              </Card>
              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>Projects Completed</CardTitle>
                  <CardTitle className="text-6xl ml-44">
                    {projects && projects.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="justify-end">
                  <Link to={"/manage/projects"}>
                    <Button>Manage Projects</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>Skills</CardTitle>
                  <CardTitle className="text-6xl ml-44">
                    {skills && skills.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="justify-end">
                  <Link to={"/manage/skills"}>
                    <Button>Manage Skills</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Stack
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Deployed
                          </TableHead>
                          <TableHead className=" md:table-cell">
                            Update
                          </TableHead>
                          <TableHead className="text-right">Visit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects && projects.length > 0 ? (
                          projects.map((element) => {
                            return (
                              <TableRow key={element._id} className="bg-accent">
                                <TableCell>
                                  <div className="font-semibold">
                                    {element.title}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="hidden md:table-cell">
                                    {element.stack}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="hidden md:table-cell">
                                    {element.deployed}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Link to={`/update/project/${element._id}`}>
                                    <Button className="bg-yellow-600">
                                      Update
                                    </Button>
                                  </Link>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Link
                                    to={
                                      element.projectLink
                                        ? `/view/project/${element._id}`
                                        : `${element.projectLink}`
                                    }
                                  >
                                    <Button className="bg-green-700">
                                      View
                                    </Button>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-2xl overflow-hidden font-bold p-10">
                              You Have Not Added Any Project
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7 gap-3">
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-4">
                    {skills && skills.length > 0 ? (
                      skills.map((element) => {
                        return (
                          <Card key={element._id}>
                            <CardHeader>{element.title}</CardHeader>
                            <CardContent>
                              Proficiency : {element.proficiency}%
                            </CardContent>
                            <CardFooter>
                              <Progress value={element.proficiency} />
                            </CardFooter>
                          </Card>
                        );
                      })
                    ) : (
                      <p className="text-2xl overflow-hidden font-bold p-10">
                        You Have Not Added Any Skill
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs>
              <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Software Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="md:table-cell">Icon</TableHead>
                          <TableHead className="md:table-cell">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {softwareApplications &&
                        softwareApplications.length > 0 ? (
                          softwareApplications.map((element) => {
                            return (
                              <TableRow key={element._id} className="bg-accent">
                                <TableCell className="font-medium">
                                  {element.name}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  <img
                                    src={element.svg && element.svg.url}
                                    alt={element.name}
                                    className="w-8 h-8"
                                  />
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  {loading && appId === element._id ? (
                                    <LoadingButton
                                      content={"Deleting...."}
                                      width={"w-fit"}
                                    />
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        handleDeleteApp(element._id)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl font-bold text-center overflow-hidden">
                              You Have Not Have Any Application
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex items-center justify-between flex-row px-7">
                    <CardTitle>Timeline</CardTitle>
                    <Link to={"/manage/timeline"}>
                      <Button>Manage Timeline</Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead className="md:table-cell text-right">
                            To
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeline && timeline.length > 0 ? (
                          timeline.map((element) => {
                            return (
                              <TableRow key={element._id} className="bg-accent">
                                <TableCell className="font-medium">
                                  {element.title}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  {element.timeline && element.timeline.from}
                                </TableCell>
                                <TableCell className="md:table-cell text-right">
                                  {element.timeline && element.timeline.to
                                    ? `${
                                        element.timeline && element.timeline.to
                                      }`
                                    : "Present"}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl font-bold text-center overflow-hidden">
                              You Don&apos;t Have Any Timeline
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
